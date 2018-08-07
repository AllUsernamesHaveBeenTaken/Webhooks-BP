const userLiked = {
  action: 'USER_LIKED_PHOTO',  
  user_id: 'userID0043a7dg682o',
  photo: {
    owner_user_id: 'user0076de438d',
    photo_id: 'photo118658fh97e9',
    like_count: '34',
    comments: ['comment2286fhjs6783, comment2275f76s97d', 'comment2286ZBD75103'],
    shares: 0
  }
}

const userPosted = {
  action: 'USER_POSTED',  
  user_id: 'userID0043a7dg682o',
  post: {
    post_id: 'post3365dhjI3fD1',
    text: 'Oh hi, Marc!',
  }
}

const newUser = {
  action: 'NEW_USER_REGISTERED',  
  user: { 
    user_id: 'userID0043a7dg682o',
    firstname: 'Joske',
    lastname: 'Vermeulen',
    email: 'joske@vermeulen.be',
    address: 'Trammezandlei 123, Schoten'
  }
}

const userUpdatedDetails = {
  action: 'USER_UPDATED_DETAILS',  
  old_data: { 
    user_id: 'userID0043a7dg682o',
    firstname: 'Joske',
    lastname: 'Vermeulen',
    email: 'joske@vermeulen.be',
    address: 'Trammezandlei 122, Schoten'
  },
  new_data: { 
    user_id: 'userID0043a7dg682o',
    firstname: 'Joske',
    lastname: 'Vermeulen',
    email: 'joske@vermeulen.be',
    address: 'Trammezandlei 122, Schoten'
  },
  change: {
    old_data: {
      address: 'Trammezandlei 123, Schoten'
    },
    new_data: {
      address: 'Trammezandlei 122, Schoten'
    }
  }
}

const userUploadedPhoto = {
  action: 'USER_POSTED',  
  user_id: 'userID0043a7dg682o',
  photo: {
    photo_id: 'photo118658fh97e9'
  }
}

export const payloads = {
  userLiked: {...userLiked},
  userPosted: {...userPosted},
  newUser: {...newUser},
  userUpdatedDetails: {...userUpdatedDetails},
  userUploadedPhoto: {...userUploadedPhoto}
}