export async function initializeDatabase(database) {
    try {
        await database.execAsync(`
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS products;

            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                email TEXT NOT NULL UNIQUE,
                senha TEXT NOT NULL DEFAULT 'A123456a!',
                role TEXT NOT NULL DEFAULT 'USER',
                created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATE
            );

            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                user_cadastro INTEGER NOT NULL,
                nome TEXT,
                descricao TEXT,
                peso REAL NOT NULL,
                marca TEXT,
                categoria TEXT,
                especificacao TEXT,
                created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATE,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (user_cadastro) REFERENCES users(id)
            );

            INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Super', 'super@email.com', 'A123456a!', 'SUPER');
            INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Admin', 'admin@email.com', 'A123456a!', 'ADMIN');
            INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('User', 'user@email.com', 'A123456a!', 'USER');

            Preview
insert into users (nome, curso, email, role) values ('Robert Shackle', 'Administração', 'rshackle0@parallels.com', 'SUPER');
insert into users (nome, curso, email, role) values ('Sammy Dinkin', 'Biológicas', 'sdinkin1@disqus.com', 'ADMIN');
insert into users (nome, curso, email, role) values ('Dianne Winckworth', 'Biológicas', 'dwinckworth2@theglobeandmail.com', 'ADMIN');
insert into users (nome, curso, email, role) values ('Guido Mathie', 'Agropecuária', 'gmathie3@reuters.com', 'SUPER');
insert into users (nome, curso, email, role) values ('Gay Seathwright', 'Administração', 'gseathwright4@chronoengine.com', 'USER');
insert into users (nome, curso, email, role) values ('Harlie Falcus', 'Informática', 'hfalcus5@ebay.co.uk', 'ADMIN');
insert into users (nome, curso, email, role) values ('Lanny Rosbotham', 'Administração', 'lrosbotham6@canalblog.com', 'SUPER');
insert into users (nome, curso, email, role) values ('Kearney MacCaffrey', 'Agropecuária', 'kmaccaffrey7@t-online.de', 'ADMIN');
insert into users (nome, curso, email, role) values ('Bayard Guite', 'Agropecuária', 'bguite8@reverbnation.com', 'ADMIN');
insert into users (nome, curso, email, role) values ('Sharron Gorgler', 'Biológicas', 'sgorgler9@smh.com.au', 'ADMIN');
insert into users (nome, curso, email, role) values ('Keriann Esherwood', 'Administração', 'kesherwooda@lycos.com', 'ADMIN');
insert into users (nome, curso, email, role) values ('Florella Fronsek', 'Agropecuária', 'ffronsekb@gnu.org', 'SUPER');
insert into users (nome, curso, email, role) values ('Priscilla Beaumont', 'Administração', 'pbeaumontc@nsw.gov.au', 'ADMIN');
insert into users (nome, curso, email, role) values ('Laney Rzehor', 'Informática', 'lrzehord@edublogs.org', 'USER');
insert into users (nome, curso, email, role) values ('Edithe Alcock', 'Biológicas', 'ealcocke@rakuten.co.jp', 'USER');
insert into users (nome, curso, email, role) values ('Gallagher Ebbage', 'Administração', 'gebbagef@squidoo.com', 'USER');
insert into users (nome, curso, email, role) values ('Shelbi Howsden', 'Biológicas', 'showsdeng@lulu.com', 'ADMIN');
insert into users (nome, curso, email, role) values ('Claudius Instone', 'Administração', 'cinstoneh@edublogs.org', 'SUPER');
insert into users (nome, curso, email, role) values ('Claudie Reuss', 'Administração', 'creussi@webmd.com', 'SUPER');
insert into users (nome, curso, email, role) values ('Coleman Skryne', 'Agropecuária', 'cskrynej@mayoclinic.com', 'ADMIN');
insert into users (nome, curso, email, role) values ('Eugenius Nuzzetti', 'Agropecuária', 'enuzzettik@soup.io', 'ADMIN');
insert into users (nome, curso, email, role) values ('Esteban Lumbley', 'Administração', 'elumbleyl@webeden.co.uk', 'USER');
insert into users (nome, curso, email, role) values ('Kort Backes', 'Administração', 'kbackesm@unc.edu', 'USER');
insert into users (nome, curso, email, role) values ('Murray Sazio', 'Biológicas', 'msazion@tripod.com', 'USER');
insert into users (nome, curso, email, role) values ('Colleen Dongall', 'Administração', 'cdongallo@google.fr', 'SUPER');
        `);
    } catch (error) {
        console.log(error);
    }
}
