import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Place } from '../models/Place.model';
import { delay, map, take, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private _places: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>([
    new Place(
      '10',
      'Manhattan Mansion',
      'In the heart of New york city.',
      'assets/images/hotel_1.jpg',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      '11',
      "L'Amour Toujours",
      'Romantic place in Paris.',
      'assets/images/hotel_2.jpg',
      189.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      '12',
      'The Peninsula Chicago',
      'Not your average city trip!',
      'assets/images/hotel_3.jpg',
      99.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      '13',
      'Marriott.',
      'Start with the customer in mind.',
      'assets/images/hotel_4.jpg',
      59.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      '14',
      'Ritz-Carlton Hotel.',
      'Promise authentic hospitality',
      'assets/images/hotel_5.jpg',
      300.0,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      '15',
      'Waldorf Astoria Hotels',
      'Tower Club Lounge',
      'assets/images/hotel_6.jpg',
      140.0,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      '16',
      'The Luxury Collection',
      'Unrivalled facilites and amenities',
      'assets/images/hotel_7.jpg',
      70.0,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      '17',
      'Malibu',
      'made with Amore <3 ',
      'assets/images/hotel_8.jpg',
      120.0,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      '18',
      'Breeze Blows',
      'Not your average city trip!',
      'assets/images/hotel_9.jpg',
      99.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
  ]);

  constructor(private authenticationService: AuthenticationService) {}

  get places(): Observable<Place[]> {
    return this._places.asObservable();
  }

  getPlaceById(placeId: string): Observable<Place> {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === placeId) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      price,
      dateFrom,
      dateTo,
      this.authenticationService.userId
    );
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
