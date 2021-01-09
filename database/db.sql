create database notes;
use notes;

create table users(
  id int(11) not null AUTO_INCREMENT primary key,
  username varchar(45) not null,
  pass varchar(45) not null
);

create table notes(
  id int(11) not null AUTO_INCREMENT primary key,
  title varchar(45),
  content varchar(100),
  userId int(11),
  foreign key(userId) references users(id)
);

ALTER TABLE notes
RENAME TO notesT;

ALTER TABLE notesT
ADD create_at timestamp not null DEFAULT current_timestamp;

ALTER TABLE users
MODIFY COLUMN pass varchar(100);