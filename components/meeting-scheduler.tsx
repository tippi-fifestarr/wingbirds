// components/MeetingScheduler.tsx
"use client"

import { useState, useEffect } from 'react'
import { Account, Aptos } from "@aptos-labs/ts-sdk"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { aptosClient, COIN_STORE } from "@/utils/aptosClient"

declare global {
  interface Window {
    aptos: any; // For better type safety, you could define a proper wallet interface
  }
}

const MEETING_COST = 1000000; // 1 APT in octas (adjust as needed)

export function MeetingScheduler({ recipientAddress }: { recipientAddress: string }) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [totalEarned, setTotalEarned] = useState<number>(0)

  // Load total earnings on component mount
  useEffect(() => {
    const loadEarnings = async () => {
      try {
        const balance = await aptosClient.getAccountResource({
          accountAddress: recipientAddress,
          resourceType: COIN_STORE,
        });
        setTotalEarned(Number(balance.coin.value));
      } catch (error) {
        console.error("Error loading earnings:", error);
      }
    };
    loadEarnings();
  }, [recipientAddress]);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"
  ];

  const handleReservation = async () => {
    if (!selectedDate || !selectedTime) return;

    try {
      // In production, you'd get this from wallet connection
      const userAccount = await window.aptos.connect();
      
      const transaction = await aptosClient.transaction.build.simple({
        sender: userAccount.address,
        data: {
          function: "0x1::aptos_account::transfer",
          functionArguments: [recipientAddress, MEETING_COST],
        },
      });

      const pendingTxn = await window.aptos.signAndSubmitTransaction(transaction);
      await aptosClient.waitForTransaction({ transactionHash: pendingTxn.hash });

      // Here you'd also want to store the meeting in your backend
      console.log("Meeting reserved for:", selectedDate, selectedTime);
      
      // Refresh total earnings
      const newBalance = await aptosClient.getAccountResource({
        accountAddress: recipientAddress,
        resourceType: COIN_STORE,
      });
      setTotalEarned(Number(newBalance.coin.value));

    } catch (error) {
      console.error("Reservation failed:", error);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Schedule a Meeting</h3>
        <div className="text-sm text-muted-foreground">
          Cost: 1 APT
        </div>
      </div>
      
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />

        <div className="grid grid-cols-4 gap-2">
          {timeSlots.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? "default" : "outline"}
              onClick={() => setSelectedTime(time)}
              className="text-sm"
            >
              {time}
            </Button>
          ))}
        </div>

        <Button 
          className="w-full" 
          onClick={handleReservation}
          disabled={!selectedDate || !selectedTime}
        >
          Reserve Meeting (1 APT)
        </Button>

        <div className="text-sm text-muted-foreground text-center">
          Total earned: {totalEarned / 100000000} APT
        </div>
      </div>
    </Card>
  );
}