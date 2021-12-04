class Subscription {
  constructor(obj) {
    (this.user_name = obj.user_name),
      (this.plan_id = obj.plan_id),
      (this.start_date = obj.start_date);
  }
}

module.exports = Subscription;
