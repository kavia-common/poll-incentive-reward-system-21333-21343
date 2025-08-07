const DELAY = (ms) => new Promise(r => setTimeout(r, ms));

/**
 * PUBLIC_INTERFACE
 * Interface to the backend API. Replace with real API calls.
 * Currently serves mock data for all endpoints.
 */
const RewardAPI = {
  // User dashboard
  fetchUserDashboard: async () => {
    await DELAY(150);
    return {
      totalTokens: 462,
      availableForRedeem: 120,
      tokensRedeemed: 342,
      pollsParticipated: 18
    };
  },
  // Poll breakdown
  fetchUserPollBreakdown: async () => {
    await DELAY(100);
    return [
      {
        pollName: "Election 2024",
        prediction: "Party A wins",
        outcome: "Party A wins",
        accuracy: 100,
        tokens: 50,
        rank: 1,
        date: "2024-06-21"
      },
      {
        pollName: "Sports Game 2",
        prediction: "Team B",
        outcome: "Team A",
        accuracy: 20,
        tokens: 2,
        rank: 18,
        date: "2024-06-15"
      }
    ];
  },
  // Reward history
  fetchUserRewardHistory: async () => {
    await DELAY(160);
    return [
      {
        date: "2024-06-21",
        type: "Quiz",
        details: "Election Poll",
        tokens: 50,
        status: "Success"
      },
      {
        date: "2024-06-18",
        type: "Redeem",
        details: "Voucher - Amazon",
        tokens: -30,
        status: "Success"
      }
    ];
  },
  // Redeem tokens (simulate)
  redeemTokens: async (amount) => {
    await DELAY(700);
    if (amount <= 120) {
      return { message: `Success! ${amount} tokens redeemed, you'll receive your reward soon.` };
    }
    return { error: "Insufficient tokens for redeem." };
  },
  // Admin dashboard
  fetchAdminDashboard: async () => {
    await DELAY(150);
    return {
      activePolls: 3,
      pendingRedemptions: 2,
      totalUsers: 87,
      issuedRewards: 2230
    };
  },
  // Admin poll manage
  fetchAdminPolls: async () => {
    await DELAY(100);
    return [
      { name: "Election 2024", result: "Party A wins", weight: 100 },
      { name: "Sports Game 2", result: "Team A", weight: 44 }
    ];
  },
  adminAddEditPoll: async (poll) => {
    await DELAY(350);
    return { ...poll }; // In real world, this returns saved object
  },
  // Admin redemptions
  fetchAdminRedemptions: async () => {
    await DELAY(130);
    return [
      {
        id: 1, user: "alice", tokens: 30, date: "2024-06-20", status: "pending",
        logs: "Requested, waiting for approval"
      },
      {
        id: 2, user: "bob", tokens: 50, date: "2024-06-18", status: "success",
        logs: "Redeemed by admin, code sent"
      }
    ];
  },
  adminUpdateRedemption: async (id, action) => {
    await DELAY(190);
    // Just updates status field in mock
    if (action === "retry") {
      return { id, user: "alice", tokens: 30, date: "2024-06-20", status: "success", logs: "Retried, code resent!" };
    }
    if (action === "cancel") {
      return { id, user: "alice", tokens: 30, date: "2024-06-20", status: "cancelled", logs: "Cancelled by admin." };
    }
    return { id };
  },
  // Reports placeholder
  fetchAdminReports: async () => {
    await DELAY(130);
    return [
      { metric: "Total polls", value: 11 },
      { metric: "Avg tokens/user", value: 22 }
    ];
  }
};

export default RewardAPI;
