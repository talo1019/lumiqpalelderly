# LumiqPal

A mobile-first, installable family companion prototype with three role-specific interfaces:

- **Grandma:** three large primary actions, one reminder, calm white surfaces
- **Kids:** playful learning, creativity, and conversation
- **Family admin:** household status, reminders, and device health

## Run locally

No build step or dependencies are required.

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

## Deploy with GitHub and Vercel

1. Push this directory to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Keep the framework preset as **Other** and leave the build/output fields empty.
4. Deploy. Every push to the selected production branch will create a new deployment.

The app includes a web manifest and service worker, so it can be added to an iPhone Home Screen from Safari.
