drop table if exists public.users, public.items, public.cartitems;

create table public.users (
    id serial primary key not null,
    username varchar(256) not null,
    password varchar(256) not null
);

create table public.items (
	id serial primary key not null,
	name varchar(256) not null,
	cost decimal(18,2) not null,
	description text not null
);

create table public.cartitems (
	id serial primary key not null,
	itemid int references items(id),
	userid int references users(id)
);

insert into public.users(username, password) values
	('user1', 'pass1'),
	('user2', 'pass2'),
	('user3', 'pass3');

insert into public.items(name, cost, description) values
	('item1', 20.00, 'this is a description'),
	('item2', 12.33, 'the second item'),
	('item3', 33.00, 'this is a description3'),
	('item4', 40.00, 'this is a description4'),
	('item5', 50.00, 'this is a description5'),
	('item6', 26.00, 'this is a description6'),
	('item7', 20.00, 'this is a description7');

insert into public.cartitems(itemid, userid) values
	(1,1),
	(1,2),
	(2,1),
	(2,2);