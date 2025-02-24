// src/common/TermsAndConditions.jsx

import NavbarPublic from "../../shared/components/header/NavbarPublic.tsx";

export default function TermsAndConditionsPage({}: { pathName: string }) {
    return (
        <div>
            <NavbarPublic currentSection="Términos y condiciones" buttonBack={true} pathName="register"/>
            <div className="container mx-auto mt-24 px-4 text-center">
                <h1 className="mt-4 text-2xl font-bold">Términos y Condiciones</h1>
                <p className="mt-2 font-semibold">Condiciones de Uso</p>
                <p className="mt-2">1. Al usar esta biblioteca, aceptas cumplir con todas las leyes y regulaciones
                    aplicables.</p>
                <p className="mt-2">2. No compartas tu contraseña ni permitas el acceso a tu cuenta a terceros.</p>
                <p className="mt-2">3. El contenido de la biblioteca es solo para uso académico y personal. Está
                    prohibido su uso comercial.</p>
                <p className="mt-2">4. La biblioteca se reserva el derecho de suspender o cancelar tu cuenta si se
                    detecta un uso inapropiado.</p>
                <p className="mt-2">5. Todos los materiales y recursos disponibles están protegidos por derechos de
                    autor y otras leyes de propiedad intelectual.</p>
                <p className="mt-2">6. La biblioteca no se hace responsable de cualquier daño directo o indirecto que
                    pueda surgir del uso de sus servicios.</p>
                <p className="mt-2">7. Nos reservamos el derecho de modificar estos términos en cualquier momento. Se te
                    notificará de los cambios realizados.</p>
                <p className="mt-2">8. Al registrarte, aceptas recibir información relevante sobre nuestra biblioteca y
                    sus servicios.</p>
            </div>
        </div>
    );
}
