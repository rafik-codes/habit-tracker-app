// خدمة حساب الإحصائيات ونسبة الإنجاز للعادات
export interface HabitForStats {
  id: string;
  name: string;
  isCompleted: boolean;
}

export function calculateHabitStats(habits: HabitForStats[]) {
  const total = habits.length;

  if (total === 0) {
    return {
      totalHabits: 0,
      completedHabits: 0,
      completionRate: 0,
    };
  }

  const completed = habits.filter((h) => h.isCompleted).length;
  const rate = Math.round((completed / total) * 100);

  return {
    totalHabits: total,
    completedHabits: completed,
    completionRate: rate, // النسبة المئوية للإنجاز
  };
}
