USE employee_db;

INSERT INTO departments (name)
VALUES ("CEO"), 
      ("Creative Department"), 
      ("Strategy Department"), 
      ("User Experience Department");

INSERT INTO role (role, salary, departments_id)
VALUES ("CEO", 320000.00, 1),
      -- Creative Department
      ("Creative Director", 150000.00, 2),
      ("Associate Creative Director", 95000.00, 2),
      ("Creative Services", 42000.00, 2),
      ("Creative Interns", 25000.00, 2),
      -- Strategy Department
      ("Strategic Service Director", 143000.00, 3),
      ("Social Media Strategist", 45000.00, 3),
      ("Strategy Researcher", 38000.00, 3),
      ("Strategy Interns", 25000.00, 3),
      -- User Experience Department
      ("User Experience Creative Director", 135000.00, 4),
      ("UI Designer", 86000.00, 4),
      ("UxD Designer", 88000.00, 4),
      ("Use Experience Interns", 25000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Percy", "Sunrise Parsons", 1, NULL),
      -- Creative Department
      ("Adam","Con Artist Medina", 2, 1),
      ("Oliver","the Mute Small", 3, 2),
      ("Fred","Shotgun Lawrence", 4, 3),
      ("Theodore","Croaker Summers", 4, 3),
      ("Eli","Golden Teeth Maynard", 4, 3),
      ("Dennis","Gravedigger Woodard", 5, 4),
      ("Rudolph","Wicked Noel", 5, 4),
      ("Jess","Sanguine Drake", 5, 4),
      ("Timothy","Shootout Serrano", 5, 5),
      ("Pearl","Diabolic Perry", 5, 5),
      ("Susan","Courage Winters", 5, 5),
      ("Anne","Bad Eye Allison", 5, 6),
      ("Thomas","the Blind Simmons", 5, 6),
      ("Susie","the Bully Bowman", 5, 6),
      -- Strategy Department
      ("Susie","Odd Stick Wood", 6, 1),
      ("Louis","Faith Porter", 7, 6),
      ("Ruth","Evil McCullough", 7, 6),
      ("Julia","the Kid Sexton", 7, 6),
      ("Horace","Quick Gun Rivera", 8, 6),
      ("Abbie","Hustler Carver", 8, 6),
      ("Roscoe","Tracker Baxter", 8, 6),
      ("Kate","Gamble Hoffman", 9, 17),
      ("Iva","Bullettooth Ferrell", 9, 17),
      ("Allen","Doc Langley", 9, 18),
      ("Stella","Miracle Leonard", 9, 18),
      ("Emily","Hawkeyes Pope", 9, 19),
      ("Julius","Stab Cooke", 9, 19),
      ("Eddie","Stormrider Paul", 9, 20),
      ("Sallie","No Teeth Boyd", 9, 20),
      ("Franklin","the Hunter Roy", 9, 21),
      ("Lydia","Friendly Face Ramsey", 9, 21),
      ("Perry","Bloodlust Richardson", 9, 22),
      ("Minnie","the Angel Cherry", 9, 22),
      -- User Experience Department
      ("Amanda","Gamble Roberson", 10, 1),
      ("Max","Scorpion Glenn", 11, 35),
      ("Howard","Bad Egg Weaver", 11, 35),
      ("Lucile","Granger Johns", 11, 35),
      ("Freda","Hallow Bond", 12, 35),
      ("Effie","Ghost Stone", 12, 35),
      ("Chester","the Mortal Potter", 12, 35),
      ("Fred","Miracle Stuart", 13, 36),
      ("Beatrice","the Predator Pearson", 13, 36),
      ("Leo","Brawn Flynn", 13, 37),
      ("Vivian","Tracker Barnes", 13, 37),
      ("Sophie","Big Gun Hayes", 13, 38),
      ("John","Shotgun Strong", 13, 38),
      ("Marian","Long Shot Short", 13, 39),
      ("Grace","Hawkeyes Foreman", 13, 39),
      ("Roscoe","Bullseye Conley", 13, 40),
      ("Leonard","Quick Gun Berry", 13, 40),
      ("Viola","Mudsill Frazier", 13, 41),
      ("Eliza","Hard Case Riggs", 13, 41);

SELECT * FROM departments;
SELECT * FROM role;
SELECT * FROM employees;