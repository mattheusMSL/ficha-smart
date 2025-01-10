import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StudentProfileProps {
  name: string;
  ra: string;
}

export const StudentProfile = ({ name, ra }: StudentProfileProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="p-4 bg-white shadow-sm rounded-lg border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-lg font-semibold">
              {name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">RA: {ra}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};