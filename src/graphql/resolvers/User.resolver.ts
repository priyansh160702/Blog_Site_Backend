import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models';
import { CreateUserDto } from '../dto/create-user.dto';

const USER_DATA = [
  {
    id: 1,
    name: 'Shannon Joutapaitis',
    profilePhoto:
      'https://clickbank.net/libero/convallis/eget.jpg?sapien=in&sapien=quis&non=justo&mi=maecenas&integer=rhoncus&ac=aliquam&neque=lacus&duis=morbi&bibendum=quis&morbi=tortor&non=id&quam=nulla&nec=ultrices&dui=aliquet',
    email: 'sjoutapaitis0@noaa.gov',
    password: 'vG0@?D$hty',
  },
  {
    id: 2,
    name: 'Gillian Rix',
    profilePhoto:
      'http://wikia.com/nulla/neque/libero/convallis/eget/eleifend/luctus.aspx?fusce=est&consequat=lacinia&nulla=nisi&nisl=venenatis&nunc=tristique&nisl=fusce&duis=congue&bibendum=diam&felis=id&sed=ornare&interdum=imperdiet&venenatis=sapien&turpis=urna&enim=pretium&blandit=nisl&mi=ut&in=volutpat&porttitor=sapien&pede=arcu&justo=sed&eu=augue&massa=aliquam&donec=erat&dapibus=volutpat&duis=in&at=congue&velit=etiam&eu=justo&est=etiam&congue=pretium&elementum=iaculis&in=justo&hac=in&habitasse=hac&platea=habitasse&dictumst=platea&morbi=dictumst&vestibulum=etiam&velit=faucibus&id=cursus&pretium=urna&iaculis=ut&diam=tellus&erat=nulla&fermentum=ut&justo=erat&nec=id&condimentum=mauris&neque=vulputate&sapien=elementum&placerat=nullam&ante=varius&nulla=nulla&justo=facilisi&aliquam=cras&quis=non&turpis=velit&eget=nec&elit=nisi&sodales=vulputate&scelerisque=nonummy&mauris=maecenas&sit=tincidunt&amet=lacus&eros=at&suspendisse=velit&accumsan=vivamus&tortor=vel&quis=nulla&turpis=eget&sed=eros&ante=elementum&vivamus=pellentesque&tortor=quisque&duis=porta&mattis=volutpat&egestas=erat&metus=quisque&aenean=erat&fermentum=eros&donec=viverra&ut=eget&mauris=congue&eget=eget&massa=semper&tempor=rutrum&convallis=nulla&nulla=nunc&neque=purus&libero=phasellus',
    email: 'grix1@ning.com',
    password: 'rB6@5c=dVzUZqBJ',
  },
  {
    id: 3,
    name: 'Elihu Hutchcraft',
    profilePhoto:
      'https://loc.gov/odio/in/hac/habitasse/platea/dictumst.xml?cras=laoreet&pellentesque=ut&volutpat=rhoncus&dui=aliquet&maecenas=pulvinar&tristique=sed&est=nisl&et=nunc&tempus=rhoncus&semper=dui&est=vel&quam=sem&pharetra=sed&magna=sagittis&ac=nam&consequat=congue&metus=risus&sapien=semper&ut=porta&nunc=volutpat&vestibulum=quam&ante=pede&ipsum=lobortis&primis=ligula&in=sit&faucibus=amet&orci=eleifend',
    email: 'ehutchcraft2@sfgate.com',
    password: 'gZ2{+,M@?G$yLg8,',
  },
  {
    id: 4,
    name: 'Etti Bedding',
    profilePhoto:
      'https://godaddy.com/id/nisl/venenatis/lacinia/aenean/sit/amet.xml?nam=parturient&ultrices=montes&libero=nascetur&non=ridiculus&mattis=mus&pulvinar=vivamus&nulla=vestibulum&pede=sagittis&ullamcorper=sapien&augue=cum&a=sociis&suscipit=natoque&nulla=penatibus&elit=et&ac=magnis&nulla=dis&sed=parturient&vel=montes&enim=nascetur&sit=ridiculus&amet=mus&nunc=etiam&viverra=vel&dapibus=augue&nulla=vestibulum&suscipit=rutrum&ligula=rutrum&in=neque&lacus=aenean&curabitur=auctor&at=gravida&ipsum=sem&ac=praesent&tellus=id&semper=massa&interdum=id&mauris=nisl&ullamcorper=venenatis&purus=lacinia&sit=aenean',
    email: 'ebedding3@rakuten.co.jp',
    password: "bL3}Fch.'YHKj7",
  },
  {
    id: 5,
    name: 'Garald Dormand',
    profilePhoto:
      'https://google.co.uk/eleifend/donec.js?sed=rutrum&vestibulum=nulla&sit=tellus&amet=in&cursus=sagittis&id=dui&turpis=vel&integer=nisl&aliquet=duis&massa=ac&id=nibh&lobortis=fusce&convallis=lacus&tortor=purus&risus=aliquet&dapibus=at&augue=feugiat&vel=non&accumsan=pretium&tellus=quis&nisi=lectus&eu=suspendisse&orci=potenti&mauris=in&lacinia=eleifend&sapien=quam&quis=a&libero=odio&nullam=in',
    email: 'gdormand4@slashdot.org',
    password: 'oG4+ab=`.}Dqb7',
  },
  {
    id: 6,
    name: 'Jocelyne Cheevers',
    profilePhoto:
      'https://livejournal.com/vestibulum/ante/ipsum/primis/in.jsp?et=viverra&magnis=diam&dis=vitae&parturient=quam&montes=suspendisse&nascetur=potenti&ridiculus=nullam&mus=porttitor&etiam=lacus&vel=at&augue=turpis&vestibulum=donec&rutrum=posuere&rutrum=metus&neque=vitae&aenean=ipsum&auctor=aliquam&gravida=non&sem=mauris&praesent=morbi&id=non&massa=lectus&id=aliquam&nisl=sit&venenatis=amet&lacinia=diam&aenean=in&sit=magna&amet=bibendum&justo=imperdiet&morbi=nullam&ut=orci&odio=pede&cras=venenatis&mi=non&pede=sodales&malesuada=sed&in=tincidunt&imperdiet=eu&et=felis&commodo=fusce&vulputate=posuere&justo=felis&in=sed&blandit=lacus&ultrices=morbi&enim=sem&lorem=mauris&ipsum=laoreet&dolor=ut&sit=rhoncus&amet=aliquet&consectetuer=pulvinar&adipiscing=sed&elit=nisl&proin=nunc&interdum=rhoncus&mauris=dui&non=vel&ligula=sem&pellentesque=sed&ultrices=sagittis&phasellus=nam&id=congue&sapien=risus&in=semper&sapien=porta&iaculis=volutpat&congue=quam&vivamus=pede&metus=lobortis&arcu=ligula&adipiscing=sit&molestie=amet&hendrerit=eleifend&at=pede&vulputate=libero&vitae=quis&nisl=orci&aenean=nullam&lectus=molestie&pellentesque=nibh&eget=in&nunc=lectus&donec=pellentesque&quis=at&orci=nulla&eget=suspendisse&orci=potenti&vehicula=cras&condimentum=in&curabitur=purus&in=eu&libero=magna&ut=vulputate',
    email: 'jcheevers5@netscape.com',
    password: 'rZ2!KJ6SiR',
  },
  {
    id: 7,
    name: 'Thayne Hinkley',
    profilePhoto:
      'http://chicagotribune.com/augue.aspx?mauris=elit&viverra=ac&diam=nulla&vitae=sed&quam=vel&suspendisse=enim&potenti=sit&nullam=amet&porttitor=nunc&lacus=viverra&at=dapibus&turpis=nulla&donec=suscipit&posuere=ligula&metus=in&vitae=lacus&ipsum=curabitur&aliquam=at&non=ipsum&mauris=ac&morbi=tellus&non=semper&lectus=interdum&aliquam=mauris&sit=ullamcorper&amet=purus&diam=sit&in=amet&magna=nulla&bibendum=quisque&imperdiet=arcu&nullam=libero&orci=rutrum&pede=ac',
    email: 'thinkley6@simplemachines.org',
    password: 'qV5*guganT*jr/U=',
  },
  {
    id: 8,
    name: 'Luella Veillard',
    profilePhoto:
      'http://dmoz.org/ultrices/posuere/cubilia.json?felis=penatibus&fusce=et&posuere=magnis&felis=dis&sed=parturient&lacus=montes&morbi=nascetur&sem=ridiculus&mauris=mus&laoreet=etiam&ut=vel&rhoncus=augue&aliquet=vestibulum&pulvinar=rutrum&sed=rutrum&nisl=neque&nunc=aenean&rhoncus=auctor&dui=gravida&vel=sem&sem=praesent&sed=id&sagittis=massa&nam=id&congue=nisl&risus=venenatis&semper=lacinia&porta=aenean&volutpat=sit&quam=amet&pede=justo&lobortis=morbi&ligula=ut&sit=odio&amet=cras&eleifend=mi&pede=pede&libero=malesuada&quis=in&orci=imperdiet&nullam=et&molestie=commodo&nibh=vulputate&in=justo',
    email: 'lveillard7@dagondesign.com',
    password: 'sZ4{D0@n=$vy(',
  },
  {
    id: 9,
    name: 'Truman Di Francesco',
    profilePhoto:
      'http://ucsd.edu/primis/in/faucibus/orci/luctus/et/ultrices.html?at=sed&feugiat=lacus&non=morbi&pretium=sem&quis=mauris&lectus=laoreet&suspendisse=ut&potenti=rhoncus&in=aliquet&eleifend=pulvinar&quam=sed&a=nisl&odio=nunc&in=rhoncus&hac=dui&habitasse=vel&platea=sem&dictumst=sed&maecenas=sagittis&ut=nam&massa=congue&quis=risus&augue=semper&luctus=porta&tincidunt=volutpat&nulla=quam&mollis=pede&molestie=lobortis&lorem=ligula&quisque=sit&ut=amet&erat=eleifend&curabitur=pede&gravida=libero&nisi=quis&at=orci&nibh=nullam&in=molestie&hac=nibh&habitasse=in&platea=lectus&dictumst=pellentesque&aliquam=at&augue=nulla&quam=suspendisse&sollicitudin=potenti&vitae=cras',
    email: 'tdi8@scientificamerican.com',
    password: 'kA3/bnmRThv<tU8Y',
  },
  {
    id: 10,
    name: 'Christin Barck',
    profilePhoto:
      'http://amazon.co.jp/nullam/sit/amet/turpis/elementum/ligula/vehicula.json?dui=tellus&luctus=nulla&rutrum=ut&nulla=erat&tellus=id&in=mauris&sagittis=vulputate&dui=elementum&vel=nullam&nisl=varius&duis=nulla&ac=facilisi&nibh=cras&fusce=non&lacus=velit&purus=nec&aliquet=nisi&at=vulputate&feugiat=nonummy&non=maecenas&pretium=tincidunt&quis=lacus&lectus=at&suspendisse=velit&potenti=vivamus&in=vel&eleifend=nulla&quam=eget&a=eros&odio=elementum&in=pellentesque&hac=quisque&habitasse=porta&platea=volutpat&dictumst=erat&maecenas=quisque&ut=erat&massa=eros&quis=viverra&augue=eget&luctus=congue&tincidunt=eget&nulla=semper&mollis=rutrum&molestie=nulla&lorem=nunc&quisque=purus&ut=phasellus&erat=in&curabitur=felis&gravida=donec',
    email: 'cbarck9@wordpress.com',
    password: 'eI6&/OwS4>',
  },
];

let incrementalId = 10;

@Resolver()
export class UserResolver {
  // Returns a User by ID.
  @Query((returns) => User, { nullable: true }) // As it can return a null value when the user is not found.
  getUserById(@Args('id', { type: () => Int }) id: number) {
    // "Int" for Graphql and "id:number" for TypeScript.
    return USER_DATA.find((user) => {
      return user.id === id;
    });
  }

  // Returns all Users
  @Query((returns) => [User])
  getUsers() {
    return USER_DATA;
  }

  @Mutation((returns) => User)

  //   Creates a user in DB.
  createUser(@Args('userData') userData: CreateUserDto) {
    const { email, password, name, profilePhoto } = userData;

    const newUser = {
      id: ++incrementalId,
      email,
      password,
      name,
      profilePhoto,
    };

    USER_DATA.push(newUser);

    console.log(USER_DATA);

    return newUser;
  }
}
