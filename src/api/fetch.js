import { LEADER_BOARD_URL, USERS_URL, GAMES_URL } from "../constants";

export const getLeaderBoardByWins = async () => {
  try {
    const response = await fetch(
      `${LEADER_BOARD_URL}?_sort=wins&_limit=10&_order=desc`
    );
    if (response.ok) {
      const responseJson = await response.json();
      return responseJson;
    }
  } catch (error) {
    console.error("Getting leader board by wins failed: ", error);
    return null;
  }
};

export const getLeaderBoardByAvgScore = async () => {
  try {
    const response = await fetch(
      `${LEADER_BOARD_URL}?_sort=averageScore&_limit=10&_order=desc`
    );
    if (response.ok) {
      const responseJson = await response.json();
      return responseJson;
    }
  } catch (error) {
    console.error("Getting leader board by average score failed: ", error);
    return null;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${USERS_URL}/${userId}`);
    if (response.ok) {
      const responseJson = await response.json();
      return responseJson;
    }
  } catch (error) {
    console.error("Getting user failed: ", error);
    return null;
  }
};

export const updateUser = async (userId, name, username, email) => {
  try {
    const response = await fetch(`${USERS_URL}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email }),
    });
    if (response.ok) return true;
    else throw new Error("Updating user failed.");
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getGameWithHighestScore = async (playerId, opponentId, score) => {
  try {
    let response;
    let responseJson;
    response = await fetch(
      `${GAMES_URL}?scores.0.memberId=${playerId}&scores.0.score=${score}`
    );
    if (response.ok) responseJson = await response.json();
    if (!responseJson.length) {
      response = await fetch(
        `${GAMES_URL}?scores.1.memberId=${playerId}&scores.1.score=${score}`
      );
      if (response.ok) responseJson = await response.json();
    }
    if (!responseJson.length) throw new Error("Game not found.");
    if (responseJson.length === 1) return responseJson[0];
    return responseJson.find(
      (game) =>
        game.scores.findIndex(
          (sc) => sc.memberId === playerId && sc.score === score
        ) > -1
    );
  } catch (error) {
    console.error("Getting game with highest score failed: ", error);
    return null;
  }
};

export const getGamesWonByUser = async (playerId, gameIndex) => {
  try {
    const response = await fetch(
      `${GAMES_URL}?winnerId=${playerId}&_page=${gameIndex}&_limit=1`
    );
    if (response.ok) {
      const responseJson = await response.json();
      return {
        game: responseJson[0],
        lastIndex: response.headers.get("X-Total-Count"),
      };
    }
  } catch (error) {
    console.error("Getting games won by user failed: ", error);
    return null;
  }
};
