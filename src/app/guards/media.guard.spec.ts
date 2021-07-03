import { TestBed } from '@angular/core/testing';

import { MediaGuard } from './media.guard';

describe('MediaGuard', () => {
  let guard: MediaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MediaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
