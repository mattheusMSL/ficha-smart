
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface StudentProfileProps {
  name: string;
  ra: string;
}

export const StudentProfile = ({ name, ra }: StudentProfileProps) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className={`p-4 bg-white shadow-sm rounded-lg border border-gray-100 ${!isMobile && 'p-6'}`}>
        <div className="flex items-center space-x-4">
          <div className={`rounded-full bg-primary/10 flex items-center justify-center ${isMobile ? 'w-12 h-12' : 'w-16 h-16'}`}>
            <span className={`text-primary font-semibold ${isMobile ? 'text-lg' : 'text-xl'}`}>
              {name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className={`font-medium text-gray-900 ${!isMobile && 'text-xl'}`}>{name}</h3>
            <p className={`text-gray-500 ${isMobile ? 'text-sm' : 'text-base'}`}>RA: {ra}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
