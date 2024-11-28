import { Component, inject, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { injectStripe, StripeCardComponent } from 'ngx-stripe';
import { PaymentService } from './../../services/payment.service';
import { MenuItem, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;

  isSuccessPayment: boolean = false;

  private readonly fb = inject(UntypedFormBuilder);

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  // Replace with your own public key
  stripe = injectStripe(
    'pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8'
  );

  price: number;

  items: MenuItem[] | undefined;

  isCardValid: boolean = false;

  activeIndex: number = 0;

  constructor(
    private paymentService: PaymentService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: this.translate.instant('PAYMENT.enterData'),
      },
      {
        label: this.translate.instant('PAYMENT.dataValid'),
      },
      {
        label: this.translate.instant('PAYMENT.completed'),
      },
    ];
    this.price = this.paymentService.price;
  }

  ngAfterViewInit() {
    this.checkCard();
  }

  createToken() {
    // const name = this.stripeTest.get('name').value;
    const name = 'ola';
    this.stripe
      .createToken(this.cardElement.element, { name })
      .subscribe((result) => {
        if (result.token) {
          this.paymentService.payment(result.token.id).subscribe({
            next: (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: res,
              });
              this.isSuccessPayment = true;
              this.activeIndex = 2;
            },
          });
        } else if (result.error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: result.error.message,
          });
        }
      });
  }

  checkCard() {
    this.cardElement.change.subscribe((event) => {
      if (event.error) {
        this.isCardValid = false;
      } else {
        this.isCardValid = event.complete;
        if (this.isCardValid) {
          this.activeIndex = 1;
        }
      }
    });
  }
}
