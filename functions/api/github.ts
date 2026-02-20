interface Env {
  GITHUB_TOKEN: string;
}

const GITHUB_USER = "hyardim";

const QUERY = `
query($login: String!) {
  user(login: $login) {
    name
    login
    avatarUrl
    followers { totalCount }
    following { totalCount }
    repositories(first: 100, ownerAffiliations: OWNER, orderBy: { field: UPDATED_AT, direction: DESC }) {
      totalCount
      nodes {
        name
        description
        url
        stargazerCount
        primaryLanguage { name color }
        isFork
      }
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}`;

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const token = context.env.GITHUB_TOKEN;

  if (!token) {
    return Response.json({ error: "GITHUB_TOKEN not configured" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "hyardim-portfolio",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USER } }),
    });

    if (!res.ok) {
      return Response.json({ error: "GitHub API error", status: res.status }, { status: 502 });
    }

    const json: any = await res.json();
    const user = json.data?.user;

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Compute stats
    const repos = user.repositories.nodes || [];
    const totalStars = repos.reduce((sum: number, r: any) => sum + (r.stargazerCount || 0), 0);

    // Language breakdown
    const langMap: Record<string, { count: number; color: string }> = {};
    for (const r of repos) {
      const lang = r.primaryLanguage;
      if (lang) {
        if (!langMap[lang.name]) langMap[lang.name] = { count: 0, color: lang.color || "#8b8b8b" };
        langMap[lang.name].count++;
      }
    }
    const topLanguages = Object.entries(langMap)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 6)
      .map(([name, { count, color }]) => ({ name, count, color }));

    // Contribution data (last 12 weeks for the mini graph)
    const calendar = user.contributionsCollection.contributionCalendar;
    const weeks = calendar.weeks.slice(-12);
    const contributions = weeks.map((w: any) =>
      w.contributionDays.map((d: any) => ({ count: d.contributionCount, date: d.date }))
    );

    const data = {
      name: user.name || GITHUB_USER,
      username: user.login,
      avatarUrl: user.avatarUrl,
      publicRepos: user.repositories.totalCount,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      totalStars,
      totalCommits: user.contributionsCollection.totalCommitContributions,
      totalPRs: user.contributionsCollection.totalPullRequestContributions,
      totalContributions: calendar.totalContributions,
      topLanguages,
      contributions,
    };

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
