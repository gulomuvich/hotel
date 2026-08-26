export function generateAIResponse(text: string, lang: string): string {
  const normalizedText = text.toLowerCase();
  const responses: Record<string, Record<string, string>> = {
    uz: {
      food: "Hurmatli mehmonimiz! Gurme taomlar bo'yicha buyurtmangiz Mishelin oshxonamizga uzatildi.",
      transport:
        "VIP Haydovchi xizmati tasdiqlandi. Litsenziyali haydovchimiz belgilangan vaqtda asosiy kirish darvozasida kutib oladi.",
      room: "Xona xizmati guruhiga darhol xabar berildi. Navbatchi butlerimiz 5 daqiqa ichida xonangiz qulayligini ideal darajaga keltiradi.",
      flight:
        "Parvoz xizmati bo'yicha so'rovingiz aviakassa menejerimizga yuborildi. Muqobil variantlar va narxlar taqdim etiladi.",
      spa: "Royal Spa & Wellness majmuasida siz uchun maxsus xususiy sauna va yoshartirish seansi bron qilindi.",
      pay: "To'lov tizimiga doir so'rovingiz qabul qilindi. Visa, Mastercard va Amex kartalari qabul qilinadi.",
      greet:
        "Assalomu alaykum, muhtaram VIP mehmonimiz! Royal Grand Palace AI Yordamchisiman.",
      default:
        "Hurmatli mehmon! So'rovingiz Bosh Menejer va VIP Concierge stantsiyasiga yuborildi.",
    },
    en: {
      food: "Dear guest, your gourmet order has been forwarded to our Michelin kitchen.",
      transport:
        "VIP Chauffeur service confirmed. Your licensed driver will await you at the main entrance.",
      room: "Housekeeping and Butler Service has been notified. Your butler will arrive within 5 minutes.",
      flight:
        "Your flight inquiry has been forwarded to our aviation concierge.",
      spa: "A private sauna and rejuvenating treatment have been reserved for you at Royal Spa & Wellness.",
      pay: "Payment inquiry received. Visa, Mastercard, and Amex cards are accepted.",
      greet:
        "Welcome, esteemed VIP guest! I am the Royal Grand Palace AI Concierge.",
      default:
        "Dear guest! Your request has been forwarded to the General Manager and VIP Concierge.",
    },
  };
  const response = responses[lang] || responses.uz;
  if (/taom|ovqat|steyk|nonushta|food|breakfast|dinner/.test(normalizedText))
    return response.food;
  if (
    /mashina|haydovchi|rolls|transfer|car|driver|airport/.test(normalizedText)
  )
    return response.transport;
  if (/xona|tozalash|sochiq|vanna|room|clean/.test(normalizedText))
    return response.room;
  if (
    /parvoz|samolyot|aviakassa|gelikopter|flight|plane|jet/.test(normalizedText)
  )
    return response.flight;
  if (/spa|massaj|sauna/.test(normalizedText)) return response.spa;
  if (/karta|to'lov|payment|card|pay/.test(normalizedText)) return response.pay;
  if (/salom|assalom|hello|hi /.test(normalizedText)) return response.greet;
  return response.default;
}
