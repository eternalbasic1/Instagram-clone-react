import { users } from "./users";

export const POSTS = [

    {
        imageurl:'https://i1.wp.com/freehindiwishes.com/wp-content/uploads/2020/10/Best-DP-For-Instagram-For-Girl-4.jpg?resize=400%2C400',
        user:users[0].user,
        likes:7870,
        caption: "Life is like a box of chocolates; sometimes you just dig out the good center parts and leave all the undesirable rest to waste.😂📸",
        profile_picture:users[0].image,
        comments:[
            {
                user:'theqazman',
                comment:'Wow! This looks Fire..',
            },
            
        ]

    },


    {
    imageurl:'https://pbs.twimg.com/media/Cq95oF6XEAEloQx.jpg',
    user:users[1].user,
    likes:99825,
    caption:'You can regret a lot of things but you’ll never regret being kind.❤️🙌',
    profile_picture:users[1].image,
    comments:[
        {
            user:'theqazman',
            comment:'yo'
        },
        {
            user:"toddler",
            comment:"wassup..!"
        },
        {
            user:'amaanath.dev',
            comment:"That's INsanee..!!"
        }
    ]

}

]



// {
//     imageurl:'',
//     user:,
//     likes:,
//     caption:'',
//     profile_picture:,
//     comments:[
//         {
//             user:'theqazman',
//             comment:'Wow'
//         }
//     ]

// }
