import type { Room } from "../../entities/hotel/model/types";

export interface BookingExtras {
  transfer: boolean;
  champagne: boolean;
  spa: boolean;
  butler: boolean;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000,
  );
  return Number.isNaN(nights) || nights < 1 ? 1 : nights;
}

export function calculateBookingTotal(
  room: Room | null,
  checkIn: string,
  checkOut: string,
  extras: BookingExtras,
): number {
  if (!room) return 0;
  const extrasTotal =
    (extras.transfer ? 150 : 0) +
    (extras.champagne ? 95 : 0) +
    (extras.spa ? 120 : 0) +
    (extras.butler ? 80 : 0);
  return room.priceUSD * calculateNights(checkIn, checkOut) + extrasTotal;
}
