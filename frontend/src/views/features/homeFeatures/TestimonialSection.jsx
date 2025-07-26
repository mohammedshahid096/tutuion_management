import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const dataArray = [
  {
    cardTitle: 'Aarav Sharma',
    cardLetters: 'AS',
    cardDescription: '9th Grade Student',
    content:
      'My math grades improved from a C to an A- after just two months of tutoring. 📈 The personalized approach really helped me understand concepts I was struggling with. 👍',
    stars: 5,
  },
  {
    cardTitle: 'Priya Patel',
    cardLetters: 'PP',
    cardDescription: 'Parent',
    content:
      '"My son was struggling with English essays, but after working with this tutor, his writing has improved dramatically📚. The online format works perfectly with our busy schedule."',
    stars: 5,
  },
  {
    cardTitle: 'Suhana',
    cardLetters: 'S',
    cardDescription: '10th Grade Student',
    content:
      '"Amazing and ❤️Loving❤️ teacher! Science & Maths became easy with their notes & tests. Improved my grades in months. I Highly recommend to join!"',
    stars: 5,
  },
];
const TestimonialSection = () => {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Student Success Stories
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear what my students and their parents have to say
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          {dataArray?.map((testimonial, index) => (
            <Card key={'testimonial' + index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-semibold text-primary">{testimonial?.cardLetters}</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">{testimonial?.cardTitle} </CardTitle>
                    <CardDescription>{testimonial?.cardDescription}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(testimonial?.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial?.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(TestimonialSection);
