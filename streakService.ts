// دالة لحساب وتحديث السلسلة (Streak) للعادات
export function calculateAndUpdateStreak(habit: {
  streak: number;
  lastCompletedDate: string | null;
}) {
  const today = new Date().toISOString().split("T")[0]; // تاريخ اليوم بصيغة YYYY-MM-DD

  if (!habit.lastCompletedDate) {
    // أول مرة ينجز فيها العادة
    return { streak: 1, lastCompletedDate: today };
  }

  if (habit.lastCompletedDate === today) {
    // أتم العادة مسبقاً اليوم، لا نغير شيئاً
    return { streak: habit.streak, lastCompletedDate: today };
  }

  // حساب الفرق بالأيام بين اليوم وتاريخ آخر إنجاز
  const lastDate = new Date(habit.lastCompletedDate);
  const currentDate = new Date(today);
  const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // أنجزها أمس واليوم، تزيد السلسلة بواقع 1
    return { streak: habit.streak + 1, lastCompletedDate: today };
  } else {
    // مر أكثر من يومين وانقطعت السلسلة، تعود للبداية
    return { streak: 1, lastCompletedDate: today };
  }
}

// خدمة حساب السلسلة المتصلة (Streak) ونظام التحفيز
export function calculateStreak(habits: Array<{ isCompleted: boolean }>) {
  if (habits.length === 0) {
    return {
      streakMessage: "💪 هيا ابدأ بإنجاز عادتك الأولى اليوم!",
      badge: "منطلق 🌱",
    };
  }

  const allCompleted = habits.every((h) => h.isCompleted);
  const anyCompleted = habits.some((h) => h.isCompleted);

  if (allCompleted) {
    return {
      streakMessage: "🔥 رائع! حافظت على سلسلة إنجازاتك كاملة اليوم!",
      badge: "بطل اليوم 🏆",
    };
  } else if (anyCompleted) {
    return {
      streakMessage: "👍 بداية جيدة، واصل لإكمال باقي عاداتك!",
      badge: "متقدم 🌟",
    };
  } else {
    return {
      streakMessage: "💪 هيا ابدأ بإنجاز عادتك الأولى اليوم!",
      badge: "منطلق 🌱",
    };
  }
}
