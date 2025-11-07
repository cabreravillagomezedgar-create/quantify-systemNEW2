import React from 'react';
import './GlowButton.css';

interface GlowButtonProps {
  href?: string;
  text: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  className?: string;
  startColor?: string;
  endColor?: string;
  glowColor?: string;
}

/**
 * Componente GlowButton - Botón con Efecto de Luz
 * 
 * Propiedades:
 * - href: URL del enlace (opcional)
 * - text: Texto del botón
 * - onClick: Función al hacer clic (opcional)
 * - target: "_blank" para abrir en nueva pestaña
 * - rel: "noopener noreferrer" para seguridad
 * - startColor: Color inicial del gradiente (ej: "#1e40af")
 * - endColor: Color final del gradiente (ej: "#3b82f6")
 * - glowColor: Color del efecto de brillo (ej: "rgba(59, 130, 246, .4)")
 */
export const GlowButton: React.FC<GlowButtonProps> = ({
  href,
  text,
  onClick,
  target,
  rel,
  className = '',
  startColor = '#1e40af',
  endColor = '#3b82f6',
  glowColor = 'rgba(59, 130, 246, .4)',
}) => {
  const style = {
    '--btn-start': startColor,
    '--btn-end': endColor,
    '--glow': glowColor,
  } as React.CSSProperties;

  const Element = href ? 'a' : 'button';

  return (
    <div className="desc-btn-wrap" style={style}>
      <Element
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={`btn-descripcion ${className}`}
      >
        {text}
      </Element>
    </div>
  );
};

export default GlowButton;
