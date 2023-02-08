drop table if exists users;

create table users(
    id serial primary key,
    name text not null,
    email varchar(150) unique not null,
    password text not null
);

drop table if exists messages;

create table messages (
    id serial primary key,
    sender_name text not null,
    company varchar(150) not null,
    email varchar(150) not null,
    phone varchar(16) not null,
    contact_reference varchar(50) not null,
    sender_message text not null,
    message_read boolean not null
);

drop table if exists replay;

create table replay (
    id serial primary key,
    sender_name text not null,
    sender_email varchar(150) not null,
    receiver_email text not null,
    message text not null
)