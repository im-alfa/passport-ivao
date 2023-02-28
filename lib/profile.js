// Parse IVAO /v2/users/me response

exports.parse = function(json) {
  var profile = {};

  // sub = IVAO vid
  profile.id = json.sub;

  // emergency fallback
  if (!profile.id) { profile.id = json.id; }

  // center id
  if (json.centerId) { profile.centerId = json.centerId; }

  // country id
  if (json.countryId) { profile.countryId = json.countryId; }

  // division id
  if (json.divisionId) { profile.divisionId = json.divisionId; }

  // created at
  if (json.createdAt) { profile.createdAt = json.createdAt; }

  // staff bool
  if (json.isStaff) { profile.isStaff = json.isStaff; }

  // language id
  if (json.languageId) { profile.languageId = json.languageId; }

  // email
  if (json.email) { profile.email = json.email; }

  // first and last name
  if (json.firstName) { profile.firstName = json.firstName; }
  if (json.lastName) { profile.lastName = json.lastName; }

  // ratings; 0 if it's not a pilot/atc
  if (json.rating) {
    if (json.rating.isPilot) { profile.pilotRating = json.rating.pilotRating.id; } else { profile.pilotRating = 0; }
    if (json.rating.isAtc) { profile.pilotRating = json.rating.atcRating.id; } else { profile.atcRating = 0; }
  }

  // hours in minutes
  if (json.hours) { profile.hours = json.hours; }
  if (json.userStaffPositions) { profile.userStaffPositions = json.userStaffPositions; }

  // staff info
  if (json.userStaffDetail) { profile.staffEmail = json.userStaffDetail.email; }
  if (json.publicNickname) { profile.publicNickname = json.publicNickname; }

  return profile;
};
