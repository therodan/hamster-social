
exports.up = function(knex, Promise) {
    return knex.raw(`
    CREATE TABLE posts
    (
        id SERIAL PRIMARY KEY NOT NULL,
        user_id INT NOT NULL,
        date TIMESTAMP WITH TIME ZONE,
        content TEXT NOT NULL,
        CONSTRAINT posts_users_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
    );

    CREATE TABLE public.likes
    (
        post_id INT NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT likes_post_id_user_id_pk PRIMARY KEY (post_id, user_id),
        CONSTRAINT likes_posts_id_fk FOREIGN KEY (post_id) REFERENCES posts (id),
        CONSTRAINT likes_users_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
    );
    `);
};

exports.down = function(knex, Promise) {
  
};
