import { Lock } from "lucide-react";
import { AccessType, AccessConfigDisplay } from "../types/accessControl";

export const accessConfigs: Record<AccessType, AccessConfigDisplay> = {
  beta: {
    title: "BETA ACCESS",
    description: "Colabship is currently in private beta. Enter your invite code to get early access.",
    icon: Lock,
    color: "text-accent",
    validCodes: [
      "BETA2025",
      "84739201", 
      "15673948",
      "29384756",
      "48573926",
      "73948561",
      "38475629",
      "75629384",
      "29384765",
      "84739265"
    ]
  }
}; 