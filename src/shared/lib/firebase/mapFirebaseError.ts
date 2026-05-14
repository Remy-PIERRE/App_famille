export function mapFirebaseError(code: string): string {
  switch (code) {
    /* =========================
       AUTH — LOGIN
    ========================= */

    case "auth/invalid-email":
      return "Email ou mot de passe incorrect";
      return "Adresse email invalide";

    case "auth/user-not-found":
      return "Email ou mot de passe incorrect";
      return "Aucun compte trouvé avec cet email";

    case "auth/wrong-password":
      return "Email ou mot de passe incorrect";
      return "Mot de passe incorrect";

    case "auth/invalid-credential":
      return "Email ou mot de passe incorrect";

    case "auth/user-disabled":
      return "Ce compte a été désactivé";

    case "auth/too-many-requests":
      return "Trop de tentatives. Réessayez plus tard";

    case "auth/network-request-failed":
      return "Erreur réseau. Vérifiez votre connexion";

    /* =========================
       AUTH — REGISTER
    ========================= */

    case "auth/email-already-in-use":
      return "Cet email est déjà utilisé";

    case "auth/weak-password":
      return "Le mot de passe doit contenir au moins 6 caractères";

    case "auth/missing-password":
      return "Veuillez renseigner un mot de passe";

    /* =========================
       GENERIC
    ========================= */

    case "permission-denied":
      return "Vous n'avez pas les permissions nécessaires";

    case "unavailable":
      return "Service temporairement indisponible";

    default:
      console.error("Unhandled Firebase error:", code);
      return "Une erreur inattendue est survenue";
  }
}
