export function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export function calculateStayPricing(checkIn, checkOut, basePrice = 48000) {
  const nights = calculateNights(checkIn, checkOut);
  const pricePerNight = typeof basePrice === "number" ? basePrice : Number(basePrice) || 48000;
  const hasWeeklyDiscount = nights >= 7;
  const subtotal = nights * pricePerNight;
  const discountAmount = hasWeeklyDiscount ? Math.round(subtotal * 0.1) : 0;
  const totalPrice = subtotal - discountAmount;

  return {
    nights,
    pricePerNight,
    hasWeeklyDiscount,
    subtotal,
    discountAmount,
    totalPrice,
  };
}
