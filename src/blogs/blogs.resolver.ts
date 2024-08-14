import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Blog } from '../models/Blog.model';

const BLOG_DATA = [
  {
    id: 1,
    title: 'Pola X',
    subTitle: 'Developer IV',
    category: 'Electrical',
    image: 'http://dummyimage.com/215x100.png/ff4444/ffffff',
    user_id: 7,
  },
  {
    id: 2,
    title: 'Thief of Bagdad, The',
    subTitle: 'Sales Associate',
    category: 'Waterproofing & Caulking',
    image: 'http://dummyimage.com/228x100.png/ff4444/ffffff',
    user_id: 9,
  },
  {
    id: 3,
    title: 'Mobsters',
    subTitle: 'Mechanical Systems Engineer',
    category: 'Marlite Panels (FED)',
    image: 'http://dummyimage.com/176x100.png/ff4444/ffffff',
    user_id: 4,
  },
  {
    id: 4,
    title: 'Abraham Lincoln: Vampire Hunter',
    subTitle: 'Marketing Manager',
    category: 'Epoxy Flooring',
    image: 'http://dummyimage.com/183x100.png/5fa2dd/ffffff',
    user_id: 2,
  },
  {
    id: 5,
    title: 'Future, The',
    subTitle: 'Legal Assistant',
    category: 'Glass & Glazing',
    image: 'http://dummyimage.com/134x100.png/cc0000/ffffff',
    user_id: 10,
  },
  {
    id: 6,
    title: 'Wing and a Prayer',
    subTitle: 'Office Assistant III',
    category: 'Electrical and Fire Alarm',
    image: 'http://dummyimage.com/209x100.png/ff4444/ffffff',
    user_id: 1,
  },
  {
    id: 7,
    title: 'Down and Out with the Dolls',
    subTitle: 'Assistant Media Planner',
    category: 'HVAC',
    image: 'http://dummyimage.com/248x100.png/ff4444/ffffff',
    user_id: 5,
  },
  {
    id: 8,
    title: 'Nightfall',
    subTitle: 'Help Desk Technician',
    category: 'Landscaping & Irrigation',
    image: 'http://dummyimage.com/107x100.png/5fa2dd/ffffff',
    user_id: 3,
  },
  {
    id: 9,
    title: 'Burning Palms',
    subTitle: 'Product Engineer',
    category: 'Overhead Doors',
    image: 'http://dummyimage.com/185x100.png/ff4444/ffffff',
    user_id: 8,
  },
  {
    id: 10,
    title: 'Mom and Dad Save the World',
    subTitle: 'Programmer Analyst IV',
    category: 'Framing (Wood)',
    image: 'http://dummyimage.com/204x100.png/5fa2dd/ffffff',
    user_id: 6,
  },
  {
    id: 11,
    title: 'Way Home, The (Jibeuro)',
    subTitle: 'Engineer II',
    category: 'Structural & Misc Steel Erection',
    image: 'http://dummyimage.com/145x100.png/5fa2dd/ffffff',
    user_id: 3,
  },
  {
    id: 12,
    title: 'They All Laughed',
    subTitle: 'Biostatistician I',
    category: 'Retaining Wall and Brick Pavers',
    image: 'http://dummyimage.com/126x100.png/cc0000/ffffff',
    user_id: 2,
  },
  {
    id: 13,
    title: 'Trash Humpers',
    subTitle: 'Director of Sales',
    category: 'Ornamental Railings',
    image: 'http://dummyimage.com/113x100.png/ff4444/ffffff',
    user_id: 4,
  },
  {
    id: 14,
    title: 'Bridge, The (Die Brücke)',
    subTitle: 'Senior Editor',
    category: 'Hard Tile & Stone',
    image: 'http://dummyimage.com/209x100.png/dddddd/000000',
    user_id: 1,
  },
  {
    id: 15,
    title: 'D.C.H. (Dil Chahta Hai)',
    subTitle: 'General Manager',
    category: 'Hard Tile & Stone',
    image: 'http://dummyimage.com/155x100.png/dddddd/000000',
    user_id: 6,
  },
  {
    id: 16,
    title: 'Dark Water',
    subTitle: 'Senior Quality Engineer',
    category: 'Elevator',
    image: 'http://dummyimage.com/107x100.png/5fa2dd/ffffff',
    user_id: 9,
  },
  {
    id: 17,
    title: 'Ordinary Miracles',
    subTitle: 'Programmer III',
    category: 'Granite Surfaces',
    image: 'http://dummyimage.com/213x100.png/dddddd/000000',
    user_id: 7,
  },
  {
    id: 18,
    title: 'Fireman, The',
    subTitle: 'Media Manager I',
    category: 'Retaining Wall and Brick Pavers',
    image: 'http://dummyimage.com/209x100.png/cc0000/ffffff',
    user_id: 10,
  },
  {
    id: 19,
    title: 'History of Future Folk, The',
    subTitle: 'Speech Pathologist',
    category: 'Drywall & Acoustical (FED)',
    image: 'http://dummyimage.com/142x100.png/ff4444/ffffff',
    user_id: 8,
  },
  {
    id: 20,
    title: 'Substance of Fire, The',
    subTitle: 'Programmer I',
    category: 'Waterproofing & Caulking',
    image: 'http://dummyimage.com/198x100.png/ff4444/ffffff',
    user_id: 5,
  },
];

@Resolver()
export class BlogResolver {
  // Returns blogs by User id.
  @Query((returns) => [Blog], { nullable: true })
  getBlogsByUserId(@Args('userId', { type: () => Int }) userId: number) {
    const blogs = BLOG_DATA.filter((blog) => blog.user_id === userId);

    return blogs;
  }
}
