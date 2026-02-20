const LEETCODE_USER = "hYardim10";

const QUERY = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      ranking
      reputation
      starRating
    }
    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
    }
    userCalendar {
      activeYears
      totalActiveDays
      submissionCalendar
    }
  }
  allQuestionsCount {
    difficulty
    count
  }
}`;

export const onRequestGet: PagesFunction = async () => {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: LEETCODE_USER } }),
    });

    if (!res.ok) {
      return Response.json({ error: "LeetCode API error", status: res.status }, { status: 502 });
    }

    const json: any = await res.json();
    const user = json.data?.matchedUser;
    const allQuestions = json.data?.allQuestionsCount;

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Parse solved counts by difficulty
    const acStats = user.submitStatsGlobal.acSubmissionNum;
    const solved: Record<string, number> = {};
    const total: Record<string, number> = {};

    for (const s of acStats) {
      solved[s.difficulty] = s.count;
    }
    for (const q of allQuestions) {
      total[q.difficulty] = q.count;
    }

    const data = {
      username: user.username,
      ranking: user.profile.ranking,
      totalSolved: solved["All"] || 0,
      totalQuestions: total["All"] || 0,
      easySolved: solved["Easy"] || 0,
      easyTotal: total["Easy"] || 0,
      mediumSolved: solved["Medium"] || 0,
      mediumTotal: total["Medium"] || 0,
      hardSolved: solved["Hard"] || 0,
      hardTotal: total["Hard"] || 0,
      totalActiveDays: user.userCalendar?.totalActiveDays || 0,
      submissionCalendar: user.userCalendar?.submissionCalendar || "{}",
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
