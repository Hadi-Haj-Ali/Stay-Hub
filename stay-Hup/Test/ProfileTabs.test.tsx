import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import ProfileTabs from '../components/ui/Profile-ui/ProfileTabs';

describe('ProfileTabs', () => {
  it('shows favorites and pending counts', () => {
    const setActiveTab = jest.fn();

    const { getByText } = render(
      <ProfileTabs
        activeTab="favorites"
        setActiveTab={setActiveTab}
        favoritesCount={2}
        pendingCount={3}
      />
    );

    expect(getByText('Favorites (2)')).toBeTruthy();
    expect(getByText('Pending (3)')).toBeTruthy();
  });

  it('changes tab when pending is pressed', () => {
    const setActiveTab = jest.fn();

    const { getByText } = render(
      <ProfileTabs
        activeTab="favorites"
        setActiveTab={setActiveTab}
        favoritesCount={2}
        pendingCount={3}
      />
    );

    fireEvent.press(getByText('Pending (3)'));

    expect(setActiveTab).toHaveBeenCalledWith('pending');
  });
});