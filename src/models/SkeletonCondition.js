export default class SkeletonCondition {
  static validate(condition) {
    if (typeof condition !== 'object') {
      return false;
    }

    switch (condition.type) {
      case 'angle':
        return !!(condition.angle_type && condition.min && condition.max && condition.min < condition.max);
      case 'all':
      case 'none':
      case 'any':
        return !!(
          condition.conditions &&
          condition.conditions.length > 0 &&
          condition.conditions.every(SkeletonCondition.validate)
        );
      default:
        return false;
    }
  }
}
