describe('Search workout templates', () => {
    /**
     * 1. Clicks Search Workouts
     * 2. Searchs for template -> "Starting Strength" -> Enter
     * 3. Clicks Starting Strength Template
     * 4. Views template reviews:
     * 5. Clicks sort by useful
     * 6. Go back to workout programs
     */

    it('user can search for a workout template', () => {
        cy.visit('/');
    });
});
