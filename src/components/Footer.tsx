export function Footer() {
    return (
        <footer className="h-16 sm:h-12 bg-white flex flex-col sm:flex-row gap-2 items-center justify-center sm:justify-between p-3 border-t border-gray-300">
            <p className="text-xs text-gray-500">Réalisé par <a className="text-blue-500" href="https://github.com/abourtnik">Anton Bourtnik</a></p>
            <p className="text-xs text-gray-500">Source du calcul <a className="text-blue-500" href="https://www.economie.gouv.fr/particuliers/tranches-imposition-impot-revenu#etapescalculir">www.economie.gouv.fr</a></p>
        </footer>
    );
}