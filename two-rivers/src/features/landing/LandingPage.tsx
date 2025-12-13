import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-river-50">
      <Container className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-river-900 sm:text-6xl">
              Where the river bends,<br />
              <span className="text-river-500">the story begins.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-river-700">
              Two Rivers is a place of origin — calm, resilient, and quietly powerful.
              What begins here does not remain small.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg">
              Begin the Journey
            </Button>
            <Button variant="ghost" size="lg">
              Learn More
            </Button>
          </div>
        </motion.div>
      </Container>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </div>
  );
};
