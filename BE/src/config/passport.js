// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const UserModel = require("../models/User");
// require("dotenv").config();
// const passport = require("passport");
// const { v4: uuidv4 } = require("uuid");

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: "/v1/auth/google/callback",
//         },
//         async function (accessToken, refreshToken, profile, cb) {
//             const tokenLogin = uuidv4();
//             let userAuth;
//             try {
//                 if (profile) {
//                     const userExits =
//                         await UserModel.findOneByEmailAndTypeLogin(
//                             profile.emails[0]?.value,
//                             "email"
//                         );

//                     if (userExits) {
//                         userExits.tokenLogin = tokenLogin;
//                         await UserModel.update(userExits);
//                         userAuth = userExits;
//                         console.log("🚀 ~ userExits:", userExits);
//                     } else {
//                         const result = await UserModel.create({
//                             email: profile.emails[0]?.value,
//                             username: profile.displayName,
//                             typeLogin: "google",
//                             tokenLogin: tokenLogin,
//                         });
//                         console.log("🚀 ~ result passport create :", result);
//                         userAuth = { _id: result.insertedId, tokenLogin };
//                     }
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//             return cb(null, userAuth);
//         }
//     )
// );

// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: process.env.FACEBOOK_CLIENT_ID,
//             clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//             callbackURL: "/v1/auth/facebook/callback",
//             profileFields: ["email", "photos", "id", "displayName"],
//         },
//         async function (accessToken, refreshToken, profile, cb) {
//             console.log("🚀 ~ profile:", profile);
//             const tokenLogin = uuidv4();
//             let userAuth;
//             try {
//                 if (profile) {
//                     const userExits =
//                         await UserModel.findOneByEmailAndTypeLogin(
//                             profile.emails[0]?.value,
//                             "facebook"
//                         );
//                     if (userExits) {
//                         userExits.tokenLogin = tokenLogin;
//                         await UserModel.update(userExits);
//                         userAuth = userExits;
//                         console.log("🚀 ~ userExits:", userExits);
//                     } else {
//                         const result = await UserModel.create({
//                             email: profile.emails[0]?.value,
//                             username: profile.displayName,
//                             typeLogin: "facebook",
//                             tokenLogin: tokenLogin,
//                         });
//                         console.log(
//                             "🚀 ~ result passport  facebook create :",
//                             result
//                         );
//                         userAuth = { _id: result.insertedId, tokenLogin };
//                     }
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//             return cb(null, userAuth);
//         }
//     )
// );

// // passport.use(
// //     new FacebookStrategy(
// //         {
// //             clientID: process.env.FACEBOOK_APP_ID,
// //             clientSecret: process.env.FACEBOOK_APP_SECRET,
// //             callbackURL: "/api/auth/facebook/callback",
// //             profileFields: ["email", "photos", "id", "displayName"],
// //         },
// //         async function (accessToken, refreshToken, profile, cb) {
// //             const tokenLogin = uuidv4();
// //             profile.tokenLogin = tokenLogin;
// //             try {
// //                 if (profile?.id) {
// //                     let response = await db.User.findOrCreate({
// //                         where: { id: profile.id },
// //                         defaults: {
// //                             id: profile.id,
// //                             email: profile.emails[0]?.value,
// //                             typeLogin: profile?.provider,
// //                             name: profile?.displayName,
// //                             avatarUrl: profile?.photos[0]?.value,
// //                             tokenLogin,
// //                         },
// //                     });
// //                     if (!response[1]) {
// //                         await db.User.update(
// //                             {
// //                                 tokenLogin,
// //                             },
// //                             {
// //                                 where: { id: profile.id },
// //                             }
// //                         );
// //                     }
// //                 }
// //             } catch (error) {
// //                 console.log(error);
// //             }
// //             // console.log(profile);
// //             return cb(null, profile);
// //         }
// //     )
// // );
