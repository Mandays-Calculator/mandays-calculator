import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Timer } from '~/components';
import { formatTime } from '~/utils/date';

jest.useFakeTimers();

describe('Timer component', () => {
  it('renders with initial time', () => {
    const initialMilliseconds = 5000;
    const { getByText } = render(
      <Timer milliseconds={initialMilliseconds} onEndCountdown={() => {}} />
    );

    expect(getByText(formatTime(initialMilliseconds))).toBeInTheDocument();
  });

  it('calls onEndCountdown when time reaches zero', () => {
    const onEndCountdownMock = jest.fn();
    const { getByText } = render(<Timer milliseconds={1000} onEndCountdown={onEndCountdownMock} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onEndCountdownMock).toHaveBeenCalled();
    expect(getByText('0 seconds')).toBeInTheDocument();
  });


  it('clears interval on unmount', () => {
    const { unmount } = render(<Timer milliseconds={5000} onEndCountdown={() => {}} />);
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});