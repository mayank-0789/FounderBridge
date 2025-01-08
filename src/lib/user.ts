import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

interface BaseUserData {
  uid: string
  name: string
  email: string
  photoURL: string
  createdAt: Date
  updatedAt: Date
}

interface DeveloperData extends BaseUserData {
  userType: 'developer'
  skills: string[]
  experience: string
  githubUrl?: string
  linkedinUrl?: string
  portfolioUrl?: string
  bio: string
}

interface RecruiterData extends BaseUserData {
  userType: 'recruiter'
  company: string
  role: string
  companySize: string
  industry: string
  linkedinUrl?: string
  companyWebsite?: string
  bio: string
}

export type UserData = DeveloperData | RecruiterData

export async function saveUserData(data: UserData) {
  try {
    // Determine collection based on user type
    const collectionName = data.userType === 'developer' ? 'candidates' : 'recruiters';
    const userRef = doc(db, collectionName, data.uid);
    const timestamp = new Date();
    
    const userData = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    console.log(`Attempting to save ${data.userType} data:`, { uid: data.uid, collection: collectionName });
    
    await setDoc(userRef, userData);
    
    console.log('User data saved successfully');
    return { success: true };
  } catch (error) {
    console.error('Error saving user data:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        throw new Error('Permission denied. Please make sure you are logged in and have the correct permissions.');
      } else if (error.message.includes('unauthenticated')) {
        throw new Error('You must be logged in to perform this action.');
      }
    }
    
    throw error;
  }
}

export async function getUserData(uid: string, userType: 'developer' | 'recruiter') {
  try {
    const collectionName = userType === 'developer' ? 'candidates' : 'recruiters';
    const userRef = doc(db, collectionName, uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function checkUserProfile(uid: string): Promise<{ exists: boolean, userType?: 'developer' | 'recruiter' }> {
  try {
    // Check in candidates collection
    const candidateRef = doc(db, 'candidates', uid);
    const candidateSnap = await getDoc(candidateRef);
    
    if (candidateSnap.exists()) {
      return { exists: true, userType: 'developer' };
    }

    // Check in recruiters collection
    const recruiterRef = doc(db, 'recruiters', uid);
    const recruiterSnap = await getDoc(recruiterRef);
    
    if (recruiterSnap.exists()) {
      return { exists: true, userType: 'recruiter' };
    }

    return { exists: false };
  } catch (error) {
    console.error('Error checking user profile:', error);
    throw error;
  }
}
