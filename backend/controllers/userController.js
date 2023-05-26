//@desc     Auth user/set tokens
//route     POST /api/user/auth
//@access   Public

import asyncHandler from "express-async-handler";

const authUser = asyncHandler(async (req, res) => {
  //   res.status(401);
  //   throw Error("something is happened");
  return res.status(200).json({ message: "Auth User" });
});

export { authUser };
