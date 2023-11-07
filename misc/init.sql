set @@global.local_infile = 1;
select * from cbmtable1; /* View data*/
truncate table cbmtable1; /* restart */
show variables like "secure_file_priv";
show global variables like "local_infile";
show variables like "local_infile";
load data local infile 'C:\\Users\\Administrator\\Documents\\uni\\Fall 2023\\se2\\data.txt' into table cbmtable1(@row)

/* Row, INDEX, Length */

set item1 = substr(@row,1,1),
item2 = substr(@row,2,6),
subject = substr(@row,8,7),
course = substr(@row,15,7),
crn = substr(@row,22,7),
item6 = substr(@row,29,1),
building = substr(@row,30,6),
room = substr(@row,36,16),
days = substr(@row,52,7),
time = substr(@row,59,4),
duration = substr(@row,63,3),
semester = substr(@row,66,1),
year = substr(@row,67,4),
room_type = substr(@row,71,3),
enrollment = substr(@row,74,15),
enrollment_excess = substr(@row,89,3),
enrollment_de_excess = substr(@row,92,3),
enrollment_ugl_affected = substr(@row,95,3),
enrollment_ugu_affected = substr(@row,98,3);