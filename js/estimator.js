/**
 * DPA Interior Design Consultants - Interactive Cost Estimator
 * Calculates accurate local market estimates for Mumbai, Thane, Vasai & Virar
 */

document.addEventListener('DOMContentLoaded', () => {
  initCostEstimator();
});

function initCostEstimator() {
  const estimator = document.getElementById('interiorEstimator');
  if (!estimator) return;

  const typeInputs = estimator.querySelectorAll('input[name="space_type"]');
  const packageInputs = estimator.querySelectorAll('input[name="package_tier"]');
  const locationSelect = estimator.querySelector('#estimatorLocation');
  const resultDisplay = estimator.querySelector('#estimatedBudgetRange');
  const waButton = estimator.querySelector('#estimatorWaBtn');

  // Base pricing matrix (in INR Lakhs)
  const baseEstimates = {
    '1bhk': { essential: '₹4.5 - ₹6.5 Lakhs', premium: '₹7.0 - ₹9.5 Lakhs', luxury: '₹10.5 - ₹14 Lakhs' },
    '2bhk': { essential: '₹7.5 - ₹10.5 Lakhs', premium: '₹11.5 - ₹15.5 Lakhs', luxury: '₹16.5 - ₹22 Lakhs' },
    '3bhk': { essential: '₹11.0 - ₹15.0 Lakhs', premium: '₹16.5 - ₹22.5 Lakhs', luxury: '₹24.0 - ₹34 Lakhs' },
    '4bhk': { essential: '₹16.0 - ₹22.0 Lakhs', premium: '₹24.0 - ₹32.0 Lakhs', luxury: '₹35.0 - ₹50+ Lakhs' },
    'office': { essential: '₹6.0 - ₹9.0 Lakhs', premium: '₹10.0 - ₹16.0 Lakhs', luxury: '₹18.0 - ₹28+ Lakhs' },
    'commercial': { essential: '₹8.0 - ₹12.0 Lakhs', premium: '₹13.5 - ₹20.0 Lakhs', luxury: '₹22.0 - ₹35+ Lakhs' }
  };

  const getSelectedValue = (inputs) => {
    for (const input of inputs) {
      if (input.checked) return input.value;
    }
    return inputs[0]?.value || '';
  };

  const updateHighlightClasses = () => {
    estimator.querySelectorAll('.estimator-option-tile').forEach(tile => {
      const input = tile.querySelector('input');
      if (input && input.checked) {
        tile.classList.add('is-selected');
      } else {
        tile.classList.remove('is-selected');
      }
    });
  };

  const calculateAndRender = () => {
    const spaceType = getSelectedValue(typeInputs);
    const packageTier = getSelectedValue(packageInputs);
    const location = locationSelect ? locationSelect.value : 'Thane / Mumbai';

    const range = baseEstimates[spaceType]?.[packageTier] || '₹10 - ₹15 Lakhs';

    if (resultDisplay) {
      resultDisplay.textContent = range;
    }

    // Capitalize names for message
    const spaceNames = {
      '1bhk': '1 BHK Residence',
      '2bhk': '2 BHK Residence',
      '3bhk': '3 BHK Residence',
      '4bhk': '4 BHK / Villa',
      'office': 'Corporate Office',
      'commercial': 'Commercial / Retail Studio'
    };

    const packageNames = {
      'essential': 'Essential Design & Execution',
      'premium': 'Premium Turnkey Interior',
      'luxury': 'Bespoke Architectural Luxury'
    };

    const friendlySpace = spaceNames[spaceType] || spaceType;
    const friendlyPackage = packageNames[packageTier] || packageTier;

    // Update WhatsApp CTA URL
    const message = encodeURIComponent(
      `*Interior Project Estimation Inquiry*\n\n` +
      `• *Space Type:* ${friendlySpace}\n` +
      `• *Scope Tier:* ${friendlyPackage}\n` +
      `• *Location:* ${location}\n` +
      `• *Estimated Budget Range:* ${range}\n\n` +
      `Hi DPA, I used the estimate calculator on your website and would like to discuss a free consultation & site visit.`
    );

    if (waButton) {
      waButton.href = `https://wa.me/919820386875?text=${message}`;
    }

    updateHighlightClasses();
  };

  typeInputs.forEach(input => input.addEventListener('change', calculateAndRender));
  packageInputs.forEach(input => input.addEventListener('change', calculateAndRender));
  if (locationSelect) locationSelect.addEventListener('change', calculateAndRender);

  calculateAndRender();
}
