// controller for WaitlistModel

import WaitlistModel from "../models/waitlistModel.js";
import { decrypt, encrypt } from "../utils/Crypto.js";

// function to get the waitlist entry by email
export const getWaitlistEntry = (req, res) => {
  console.log("getWaitlistEntry");
  let email
  try {
    email = decrypt(req.query.token);
    console.log(email)
  } catch (err) {
    console.log(err)
    return res.status(400).json({message: err});
  }
  WaitlistModel.findOne({ email: email }, (err, waitlistEntry) => {
    if (err) {
      return res.status(400).json({message: err});
    } else {
      if (waitlistEntry) {
        console.log(waitlistEntry)
        return res.status(200).json({waitlistEntry: waitlistEntry});
      } else {
        console.log("no waitlist entry found");
        return res.status(404).json({ message: "No waitlist entry found" });
      }
    }
  });
}

// function to create a new waitlist entry
export const createWaitlistEntry = (req, res) => {
  console.log("createWaitlistEntry");
  const waitlistEntry = new WaitlistModel(req.body.params);
  console.log(req.body.params)
  // check if email is in correct format
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(waitlistEntry.email)) {
    return res.status(400).json({ message: "Invalid Email" }); 
  }
  waitlistEntry.save((err, waitlistEntry) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    } else {
      let token;
      try {
        token = encrypt(req.body.params.email);
      } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err });
      }
      const link = getOneTimeLink(token);
      console.log(link);
      return res.status(201).json({ message: "Waitlist entry created", link: link });
    }
  });
}

// function to update a wailist entry by email
// entry is updated with the nft id and claimed is set to true
// if the entry is already claimed, the entry is not updated
export const setWailistClaimed = (req, res) => {
  console.log("setWailistClaimed");
  let email
  try {
    email = decrypt(req.body.params.token);
    console.log(email)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err);
  }
  WaitlistModel.findOneAndUpdate(
    { email: email, claimed: false, nftId: null },
    { $set: { nftId: req.body.params.nftId, claimed: true } },
    { new: true },
    (err, waitlistEntry) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: err });
      } else {
        if (waitlistEntry) {
          console.log(waitlistEntry);
          return res.status(200).json({message:"Claimed!", waitlistEntry: waitlistEntry});
        } else {
          console.log('waitlistEntry not found');
          return res.status(404).json({ message: "Already Claimed" });
        }
      }
    }
  );
}

// function to create a one time link by encoding the email and return it
const getOneTimeLink = (token) => {
  const link = `${process.env.DOMAIN_NAME}/claim/${token}`;
  return link; 
}
