-- テーブルの作成
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE groups (
    group_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE tests (
    test_id SERIAL PRIMARY KEY,
    content TEXT NOT NULL
);

CREATE TABLE user_groups (
    user_id INT REFERENCES users(user_id),
    group_id INT REFERENCES groups(group_id),
    PRIMARY KEY (user_id, group_id)
);

CREATE TABLE group_tests (
    group_id INT REFERENCES groups(group_id),
    test_id INT REFERENCES tests(test_id),
    PRIMARY KEY (group_id, test_id)
);

-- 初期データの挿入

-- ユーザーの挿入
INSERT INTO users (name, email, password) VALUES ('User X', 'userx@example.com', 'password1');
INSERT INTO users (name, email, password) VALUES ('User Y', 'usery@example.com', 'password2');
INSERT INTO users (name, email, password) VALUES ('User Z', 'userz@example.com', 'password3');

-- グループの挿入
INSERT INTO groups (name) VALUES ('Group A');
INSERT INTO groups (name) VALUES ('Group B');

-- 試験データの挿入
INSERT INTO tests (content) VALUES ('Test Content 1');
INSERT INTO tests (content) VALUES ('Test Content 2');

-- ユーザーとグループの関連付け
INSERT INTO user_groups (user_id, group_id) VALUES (1, 1); -- User X to Group A
INSERT INTO user_groups (user_id, group_id) VALUES (2, 2); -- User Y to Group B
INSERT INTO user_groups (user_id, group_id) VALUES (3, 1); -- User Z to Group A
INSERT INTO user_groups (user_id, group_id) VALUES (3, 2); -- User Z to Group B

-- グループと試験データの関連付け
INSERT INTO group_tests (group_id, test_id) VALUES (1, 1); -- Test 1 to Group A
INSERT INTO group_tests (group_id, test_id) VALUES (1, 2); -- Test 2 to Group A
INSERT INTO group_tests (group_id, test_id) VALUES (2, 2); -- Test 2 to Group B