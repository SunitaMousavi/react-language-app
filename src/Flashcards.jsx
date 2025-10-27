import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Brain,
  TrendingUp,
  ChevronRight,
  RotateCcw,
  Check,
  X,
  User,
  LogOut,
} from "lucide-react";
import { addCard, getAllCards, updateCard } from "./services/firestoreService";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
