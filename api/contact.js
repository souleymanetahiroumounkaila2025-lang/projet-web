export default async function handler(req, res) {
    // On accepte uniquement les requêtes POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    try {
        // Récupération des données du formulaire
        const { firstName, lastName, email, phone, subject, message } = req.body;

        // 💡 ICI : Vous mettez votre logique backend. 
        // Par exemple, envoyer un e-mail avec un service gratuit comme Resend ou Brevo,
        // ou enregistrer dans une base de données gratuite (Supabase, Neon).

        console.log(`Nouveau message de ${firstName} ${lastName} (${email})`);

        // On répond au frontend que tout s'est bien passé
        return res.status(200).json({ success: true, message: 'Message reçu avec succès !' });
    } catch (error) {
        return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}