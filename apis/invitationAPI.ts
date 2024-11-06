import { BASE_URL } from "../utils/globals";

/**
 * Get an invitation by ID
 */
export async function getInvitationById(id: number) {
  const res = await fetch(`${BASE_URL}/invitations/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Invalid invitation");
  return res.json();
}


/**
 * Get all invitations for a user by user ID
 * @param userId 
 * @returns 
 */
export async function getInvitationsByUser(userId: string) {
    const res = await fetch(`${BASE_URL}/invitations/user/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    
    if(!res.ok) throw new Error("Invalid user invitations");
    return res.json();
}
/**
 * Get all invitations for an organisation by organisation ID
 */
export async function getInvitationsByOrg(orgId: number) {
  const res = await fetch(`${BASE_URL}/invitations/org/${orgId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Invalid organisation invitations");
  return res.json();
}

/**
 * Create a new invitation
 */
export async function createInvitation(orgId: number, receiverId: string, senderId: string) {
  const newInvitation = { orgId, receiverId, senderId };
  
  const res = await fetch(`${BASE_URL}/invitations/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newInvitation),
  });

  if (!res.ok) throw new Error("Failed to create invitation");
  return res.json();
}

/**
 * Respond to an invitation
 */
export async function respondToInvitation(id: number, response: boolean) {
  const res = await fetch(`${BASE_URL}/invitations/respond/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ response }),
  });

  if (!res.ok) throw new Error("Failed to respond to invitation");
  return res.json();
}

/**
 * Delete an invitation by ID
 */
export async function deleteInvitation(id: number) {
  const res = await fetch(`${BASE_URL}/invitations/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to delete invitation");
  return res.json();
}
