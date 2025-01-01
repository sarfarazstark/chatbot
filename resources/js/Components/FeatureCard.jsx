import React from "react";
import PropTypes from "prop-types";

export function FeatureCard({ icon: Icon, title, description }) {
    return (
        <div className="p-6 rounded-xl bg-gray-800 hover:bg-gray-750 transition-colors border border-gray-700">
            <Icon className="h-8 w-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    );
}

FeatureCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};
