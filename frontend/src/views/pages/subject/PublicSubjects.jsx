import { memo, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronLeft, FileText, GraduationCap, Menu, School } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useParams } from 'react-router-dom';

// Sample data structure for subjects by class
// In a real application, you would fetch this data based on the selected board
const subjectsByClass = {
  1: [
    { id: 's1c1', name: 'English', description: 'Basic English language and literature' },
    { id: 's2c1', name: 'Mathematics', description: 'Basic arithmetic and number concepts' },
    {
      id: 's3c1',
      name: 'Environmental Studies',
      description: 'Introduction to environment and surroundings',
    },
    { id: 's4c1', name: 'Art & Craft', description: 'Creative activities and basic drawing' },
  ],
  2: [
    { id: 's1c2', name: 'English', description: 'Elementary English language and literature' },
    { id: 's2c2', name: 'Mathematics', description: 'Basic arithmetic and geometry' },
    {
      id: 's3c2',
      name: 'Environmental Studies',
      description: 'Plants, animals and our surroundings',
    },
    { id: 's4c2', name: 'Hindi', description: 'Basic Hindi language and literature' },
    { id: 's5c2', name: 'Computer Science', description: 'Introduction to computers' },
  ],
  3: [
    { id: 's1c3', name: 'English', description: 'Reading comprehension and grammar' },
    { id: 's2c3', name: 'Mathematics', description: 'Arithmetic, fractions and measurements' },
    {
      id: 's3c3',
      name: 'Environmental Studies',
      description: 'Natural resources and conservation',
    },
    { id: 's4c3', name: 'Hindi', description: 'Hindi grammar and literature' },
    { id: 's5c3', name: 'Computer Science', description: 'Basic computer operations' },
  ],
  4: [
    { id: 's1c4', name: 'English', description: 'Advanced reading and writing skills' },
    { id: 's2c4', name: 'Mathematics', description: 'Fractions, decimals and geometry' },
    { id: 's3c4', name: 'Environmental Studies', description: 'Geography and natural sciences' },
    { id: 's4c4', name: 'Hindi', description: 'Advanced Hindi grammar and literature' },
    { id: 's5c4', name: 'Computer Science', description: 'Word processing and presentations' },
  ],
  5: [
    { id: 's1c5', name: 'English', description: 'Literature and creative writing' },
    { id: 's2c5', name: 'Mathematics', description: 'Decimals, percentages and geometry' },
    { id: 's3c5', name: 'Science', description: 'Introduction to physics, chemistry and biology' },
    { id: 's4c5', name: 'Social Studies', description: 'History, geography and civics' },
    { id: 's5c5', name: 'Hindi', description: 'Hindi literature and composition' },
    { id: 's6c5', name: 'Computer Science', description: 'Basic programming concepts' },
  ],
  6: [
    { id: 's1c6', name: 'English', description: 'Advanced literature and grammar' },
    { id: 's2c6', name: 'Mathematics', description: 'Algebra, geometry and data handling' },
    { id: 's3c6', name: 'Science', description: 'Physics, chemistry and biology concepts' },
    { id: 's4c6', name: 'Social Studies', description: 'Ancient civilizations and geography' },
    { id: 's5c6', name: 'Hindi', description: 'Advanced Hindi literature' },
    { id: 's6c6', name: 'Sanskrit', description: 'Introduction to Sanskrit language' },
  ],
  7: [
    { id: 's1c7', name: 'English', description: 'Literature analysis and composition' },
    { id: 's2c7', name: 'Mathematics', description: 'Advanced algebra and geometry' },
    { id: 's3c7', name: 'Science', description: 'Physics, chemistry and biology' },
    { id: 's4c7', name: 'Social Studies', description: 'Medieval history and geography' },
    { id: 's5c7', name: 'Hindi', description: 'Hindi poetry and prose' },
    { id: 's6c7', name: 'Sanskrit', description: 'Sanskrit grammar and literature' },
  ],
  8: [
    { id: 's1c8', name: 'English', description: 'Advanced literature and writing skills' },
    { id: 's2c8', name: 'Mathematics', description: 'Algebra, geometry and mensuration' },
    {
      id: 's3c8',
      name: 'Science',
      description: 'Advanced concepts in physics, chemistry and biology',
    },
    { id: 's4c8', name: 'Social Studies', description: 'Modern history and civics' },
    { id: 's5c8', name: 'Hindi', description: 'Advanced Hindi literature and grammar' },
    { id: 's6c8', name: 'Sanskrit', description: 'Advanced Sanskrit' },
  ],
  9: [
    { id: 's1c9', name: 'English', description: 'Literature and language' },
    { id: 's2c9', name: 'Mathematics', description: 'Algebra, geometry and statistics' },
    { id: 's3c9', name: 'Science', description: 'Physics, chemistry and biology' },
    { id: 's4c9', name: 'Social Studies', description: 'Contemporary India and economics' },
    { id: 's5c9', name: 'Information Technology', description: 'Computer applications' },
    { id: 's6c9', name: 'Hindi', description: 'Hindi course A and B' },
  ],
  10: [
    { id: 's1c10', name: 'English', description: 'Literature and language' },
    {
      id: 's2c10',
      name: 'Mathematics',
      description: 'Advanced algebra, trigonometry and statistics',
    },
    { id: 's3c10', name: 'Science', description: 'Physics, chemistry and biology' },
    { id: 's4c10', name: 'Social Studies', description: 'India and the contemporary world' },
    { id: 's5c10', name: 'Information Technology', description: 'Advanced computer applications' },
    { id: 's6c10', name: 'Hindi', description: 'Advanced Hindi course A and B' },
  ],
  11: [
    { id: 's1c11', name: 'English', description: 'Core English language and literature' },
    { id: 's2c11', name: 'Physics', description: 'Mechanics, thermodynamics and waves' },
    { id: 's3c11', name: 'Chemistry', description: 'Organic and inorganic chemistry' },
    { id: 's4c11', name: 'Mathematics', description: 'Calculus, algebra and coordinate geometry' },
    { id: 's5c11', name: 'Biology', description: 'Cell biology, plant and animal physiology' },
    {
      id: 's6c11',
      name: 'Computer Science',
      description: 'Programming fundamentals and data structures',
    },
  ],
  12: [
    { id: 's1c12', name: 'English', description: 'Advanced English language and literature' },
    { id: 's2c12', name: 'Physics', description: 'Electromagnetism, optics and modern physics' },
    {
      id: 's3c12',
      name: 'Chemistry',
      description: 'Advanced organic, inorganic and physical chemistry',
    },
    { id: 's4c12', name: 'Mathematics', description: 'Advanced calculus, vectors and probability' },
    { id: 's5c12', name: 'Biology', description: 'Genetics, evolution and human physiology' },
    { id: 's6c12', name: 'Computer Science', description: 'Advanced programming and databases' },
  ],
};

// Sample board data for context
const boardsData = [
  {
    _id: '680e038ba0e4b51180bd0c28',
    name: 'CBSE',
    description: 'Central Board of Secondary Education',
  },
  {
    _id: '680e038ba0e4b51180bd0c29',
    name: 'ICSE',
    description: 'Indian Certificate of Secondary Education',
  },
  {
    _id: '680e038ba0e4b51180bd0c30',
    name: 'State Board',
    description: 'State Education Board',
  },
];

const PublicSubjectsPage = () => {
  const { boardId } = useParams();
  const [selectedClass, setSelectedClass] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const board = boardsData.find((b) => b._id === boardId) || boardsData[0];
  const isMobile = useIsMobile();

  // GSAP animations
  useGSAP(() => {
    // Animate class tabs
    gsap.fromTo(
      '.class-tab',
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.4,
        ease: 'power1.out',
      }
    );

    // Animate subject cards
    animateSubjectCards();
  }, [selectedClass]);

  const animateSubjectCards = () => {
    gsap.fromTo(
      '.subject-card',
      {
        scale: 0.9,
        opacity: 0,
        y: 20,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back.out(1.2)',
      }
    );
  };

  const handleSubjectSelect = (subjectId) => {
    setSelectedSubject(subjectId);

    // Animate the selected subject
    gsap.to('.subject-card', {
      scale: 0.98,
      opacity: 0.7,
      duration: 0.3,
    });

    gsap.to(`.subject-card[data-id="${subjectId}"]`, {
      scale: 1.02,
      opacity: 1,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
    });
  };

  const handleClassSelect = (classNum) => {
    setSelectedClass(classNum);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  // Generate class tabs (1-12)
  const classTabs = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <School className="h-6 w-6 text-primary" />
            {board.name} Subjects
          </h1>
        </div>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          {board.description}
        </Badge>
      </div>

      <div className="mb-6">
        {isMobile ? (
          <div className="flex items-center justify-between border rounded-md p-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="font-medium">Class {selectedClass}</span>
            </div>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Menu className="h-4 w-4" />
                  Select Class
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Select Class</DrawerTitle>
                  <DrawerDescription>Choose a class to view its subjects</DrawerDescription>
                </DrawerHeader>
                <div className="grid grid-cols-3 gap-2 p-4">
                  {classTabs.map((classNum) => (
                    <DrawerClose key={classNum} asChild>
                      <Button
                        variant={selectedClass === classNum ? 'default' : 'outline'}
                        className="w-full"
                        onClick={() => handleClassSelect(classNum)}
                      >
                        Class {classNum}
                      </Button>
                    </DrawerClose>
                  ))}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        ) : (
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex p-2">
              {classTabs.map((classNum) => (
                <Button
                  key={classNum}
                  variant={selectedClass === classNum ? 'default' : 'ghost'}
                  className="class-tab mx-1 min-w-[90px]"
                  onClick={() => handleClassSelect(classNum)}
                >
                  Class {classNum}
                </Button>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Class {selectedClass} Subjects
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Select a subject to view chapters and learning materials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectsByClass[selectedClass]?.map((subject) => (
          <Card
            key={subject.id}
            className={`subject-card cursor-pointer transition-all duration-300 hover:shadow-md ${
              selectedSubject === subject.id ? 'ring-2 ring-primary' : ''
            }`}
            data-id={subject.id}
            onClick={() => handleSubjectSelect(subject.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {subject.name}
              </CardTitle>
              <CardDescription>{subject.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Multiple chapters available</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(
                    `Navigate to chapters for Subject: ${subject.id}, Class: ${selectedClass}`
                  );
                  // Implement your routing logic here
                  // router.push(`/chapters/${boardId}/${selectedClass}/${subject.id}`);
                }}
              >
                View Chapters
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedSubject && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-center">
            <span className="font-semibold">
              {subjectsByClass[selectedClass]?.find((s) => s.id === selectedSubject)?.name}
            </span>{' '}
            selected. Click "View Chapters" to continue.
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(PublicSubjectsPage);
