import { DailyMetricsModel } from "../schemas/dailyMetrics.js";

class DailyMetrics {
  static async createUserMetrics(user) {
    const metrics = await DailyMetricsModel.create({ user_id: user._id });
    user.metrics.push(metrics._id);
    await user.save();
    return metrics;
  }

  static async countUp(user_id, condition) {
    const metrics = await DailyMetricsModel.findOne({
      user_id,
      date: `${new Date().toISOString().substr(0, 10)}`,
    });
    if (condition === "follow") {
      metrics.follow_count += 1;
    }
    if (condition === "like") {
      metrics.like_count += 1;
    }
    metrics.save();
  }

  static async createWholeUsersMetrics(users) {
    try {
      users.forEach(async (user) => {
        // daily도 만들고, User에도 넣어줘야 하는데, 유저한텐 7일간의 정보만 들어가야 한다.
        const metrics = await DailyMetricsModel.create({
          user_id: user._id,
        });
        if (user.metrics.length >= 7) {
          user.metrics.shift();
        }
        user.metrics.push(metrics._id);
        await user.save();
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export { DailyMetrics };
