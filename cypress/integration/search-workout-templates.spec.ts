describe('Search workout templates', () => {
    /**
     * 1. Clicks Search Workouts
     * 2. Searchs for template -> "Starting Strength" -> Enter
     * 3. Clicks Starting Strength Template
     * 4. Views template reviews:
     * 5. Clicks sort by useful
     * 6. Go back to workout programs
     */

    it('can navigate to search page', () => {
        cy.visit('/');
        cy.findByRole('button', {
            name: /Search Workouts/i,
        }).click({ force: true });
    });

    it('can search for a workout template', () => {
        cy.get('input').click({ force: true }).type('Starting Strength{enter}');
    });

    it('can navigate to searched template', () => {
        cy.get('div[data-cy="search-workout-template-dropdown"]')
            .contains('Starting Strength')
            .click({ force: true });
    });
});
